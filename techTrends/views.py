from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.http import FileResponse
from django.views.decorators.csrf import csrf_exempt
import json
import openai
import requests
from gtts import gTTS
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer
import pyttsx3
import tempfile
import os
from moviepy.editor import VideoFileClip, AudioFileClip


from django.http import HttpResponse
from django.urls import reverse

def generate_video(request):
    # code to combine video and audio
    video_path = 'output.mp4'
    video_url = request.build_absolute_uri(reverse('media', args=[video_path]))
    return HttpResponse(video_url)



def combine_video_audio(video_url, audio_file):
    video_data = requests.get(video_url).content
    with tempfile.NamedTemporaryFile(delete=False) as video_file:
        video_file.write(video_data)
        video_path = video_file.name
    video = VideoFileClip(video_path)
    audio = AudioFileClip(audio_file)

    if video.duration > audio.duration:
        video = video.subclip(0, audio.duration)
    elif video.duration < audio.duration:
        video = video.loop(int(audio.duration / video.duration) + 1)
        video = video.subclip(0, audio.duration)
    video = video.set_audio(audio)
    video.write_videofile("output.mp4")
    print("Video and audio combined and saved as output.")



def text_to_speech_with_sentiment(text, filename='output.mp3'):
    nltk.download('vader_lexicon')
    sid = SentimentIntensityAnalyzer()
    sentiment = sid.polarity_scores(text)
    engine = pyttsx3.init()
    voices = engine.getProperty('voices')
    for voice in voices:
        if voice.gender == "male":
            engine.setProperty('voice', voice.id)
            break
    rate = 120 # default rate
    if sentiment["compound"] >= 0.5:
        rate = 170 # increase rate for positive sentiment
    elif sentiment["compound"] > -0.5 and sentiment["compound"] < 0.5:
        rate = 120 # neutral sentiment
    else:
        rate = 100 # decrease rate for negative sentiment
    engine.setProperty('rate', rate)
    # curr_dir = os.path.dirname(os.path.abspath(__file__))
    # filename = os.path.join(curr_dir, filename)
    engine.save_to_file(text, filename)
    engine.runAndWait()




APIKEY ='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'


openai.api_key = APIKEY
def summarize_text(text):
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=(f"Please summarize the following text as if you are presenting it to someone and do not add \n\n before the result: {text}"),
        temperature=0,
        max_tokens=150
    )
    result = response["choices"][0]["text"]
    result = result.replace("\n", "")
    return result


def find_video_topic(text):
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=(f"Please give the topic name in maximum 1 words to which the text is related to so that I can find a stock video related to it: {text}"),
        temperature=0,
        max_tokens=10
    )
    result= response["choices"][0]["text"]
    result = result.replace("\n", "")
    return result   


def find_stock_video(data):
    # Search for a stock video related to the data
    data = data.replace("\n", "")
    query = data
    url = f"https://api.pexels.com/videos/search?query={query}&per_page=1"
    headers = {
        'Authorization': 'LQmtJ77K3CYXjNLcVH9eVIBE4DNEa208HuyLakS12y9p0wkSkBG3bhbR'
    }
    response = requests.get(url, headers=headers)
    data = response.json()
    if 'videos' in data:
        video_files = data["videos"][0]["video_files"]
        video_url = None
        for video_file in video_files:
            if video_file["width"] == 426:
                video_url = video_file["link"]
                break
            elif video_file["width"] == 640:
                video_url = video_file["link"]
                break
        if video_url:
            return {"query":query,"video_url":video_url}
        else:
            return {"query":query,"error":"No videos found for width of 426 pixels"}
    else:
        return {"query":query,"error":"No videos found"}


# !---------------------------------------------------------------------------------------------------------------------------------------------

def entry(request):
    if request.method == 'GET':
        return HttpResponse("Welcome to the Tech Trends API")


def get_video(request):
    video_path = 'output.mp4'
    response = FileResponse(open(video_path, 'rb'))
    response['Content-Type'] = 'video/mp4'
    response['Content-Disposition'] = 'inline; filename="output.mp4"'
    return response

    
@csrf_exempt
def sum_text(request):
    if request.method == 'POST':


        data = json.loads(request.body)
        #todo STEP 1: Summarize the text
        summarize_data = summarize_text(data['text'])

        #todo STEP 2: Find the topic of the text
        video_topic = find_video_topic(data['text'])

        #todo STEP 3: Find a stock video related to the topic
        video_url = find_stock_video(video_topic)
        

        #todo STEP 4: Convert the text to speech
        text_to_speech_with_sentiment(summarize_data,)

        #todo STEP 5: Combine the video and audio
        url = video_url['video_url']
        combine_video_audio(url, "output.mp3")

        return JsonResponse({'summary': summarize_data, 'video_topic': video_topic, 'video_url': video_url ,'error': None})
    else:
        return JsonResponse({'error': 'Invalid request method', 'summary': None, 'video_topic': None, 'video_url': None})
