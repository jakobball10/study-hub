# JakobAlarm

An Android alarm that plays your Spotify music and keeps playing until you **hold the off button for 3 seconds**. No snooze and no auto-off.

**[Download JakobAlarm.apk](https://jakobball10.github.io/study-hub/jakobalarm/JakobAlarm-4.0.apk)** · Android 8+ · free

## Install
1. Download the APK on your Android phone, tap **Open**, then **Install**. If asked, allow Chrome to install unknown apps.
2. Allow notifications and alarms when asked.
3. Tap **Test alarm now** to check everything works.

No special permissions, Spotify developer account or Premium needed. It works with whichever account is logged into the Spotify app.

## How it works
- **Night before:** in Spotify, tap ⋮ → **Share** → **JakobAlarm** on a song, playlist or album, or paste a Spotify link. Choose a time and tap **Set alarm**. JakobAlarm opens your pick in Spotify; tap Play and come back, and JakobAlarm pauses it, ready for the morning.
- **Morning:** JakobAlarm presses play, the same way a headphone button does, and Spotify carries on from your pick. If the music stops, JakobAlarm presses play again.
- **Turning it off:** hold the red button for 3 seconds. Letting go early resets it.
- **Backup:** if no music is playing about 35 seconds after the alarm goes off, the phone's own alarm sound plays instead. The alarm is never silent.

## Limitations
- Don't play anything else in Spotify after setting the alarm. In the morning, Spotify resumes the last thing it played.
- Spotify needs to be installed and logged in, with internet access (or the music downloaded).
- To repeat one song, turn on repeat in Spotify.
- On Samsung, Xiaomi, Oppo and similar phones, set battery use to **Unrestricted** for both JakobAlarm and Spotify.

## Code map
- `MainActivity.kt`: setup screen, choosing music, getting it ready in Spotify
- `AlarmService.kt`: presses play, keeps music going, backup sound
- `AlarmActivity.kt` + `HoldToStopButton.kt`: the wake-up screen and its 3-second hold button
- `Spotify.kt`: opening Spotify, pressing play/pause, link handling
- `AlarmScheduler.kt` / `Receivers.kt`: scheduling, re-arming after a restart
- `AlarmStore.kt`: saved settings

Open the folder in Android Studio to build it. No third-party libraries. Not affiliated with Spotify.
