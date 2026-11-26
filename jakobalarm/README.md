# JakobAlarm

An Android alarm that plays your Spotify music and keeps playing until you **hold the off button for 3 seconds**. No snooze and no auto-off.

**[Download JakobAlarm.apk](https://jakobball10.github.io/study-hub/jakobalarm/JakobAlarm.apk)** · Android 8+ · free

## Install
1. Download the APK on your Android phone and open it. If asked, allow your browser to install unknown apps.
2. Open JakobAlarm and tap **Let JakobAlarm control Spotify**, then switch JakobAlarm on.
   - If the switch is greyed out or says "Restricted setting": open App info, tap ⋮ (top right) → **Allow restricted settings**, then try again. Android does this for every app downloaded from a website.
3. Allow notifications and alarms when asked.
4. Tap **Test alarm now** to check everything works.

There's no Spotify developer account, Client ID or Premium requirement. JakobAlarm works with whichever account is logged into the Spotify app.

## How it works
- **Night before:** in Spotify, tap ⋮ → **Share** → **JakobAlarm** on a song, playlist or album, or paste a Spotify link. Then choose a time and tap **Set alarm**.
- **Morning:** JakobAlarm starts Spotify using Android's standard media controls (the same ones headphones and car stereos use). It tries three things in order:
  1. Play the exact link you chose.
  2. Search Spotify for its name.
  3. Press play, which resumes whatever Spotify last played.

  If the music gets paused, it starts again. If you chose one song, it repeats.
- **Turning it off:** hold the red button for 3 seconds. Letting go early resets it. The notification has no off button, and Back does nothing.
- **Backup:** if no music is playing about 35 seconds after the alarm goes off, the phone's own alarm sound plays instead. The alarm is never silent.

## Limitations
- Spotify has to be installed and logged in, with internet access (or the music downloaded).
- On free Spotify, Spotify may shuffle or mix in other songs.
- JakobAlarm needs "notification access" only to find and control Spotify's player. It never reads or stores notifications.
- On Samsung, Xiaomi, Oppo and similar phones, set battery use to **Unrestricted** for both JakobAlarm and Spotify.

## Code map
- `MainActivity.kt`: setup screen, choosing music, Spotify access
- `AlarmService.kt`: starts Spotify, keeps it playing, backup sound
- `AlarmActivity.kt` + `HoldToStopButton.kt`: the wake-up screen and its 3-second hold button
- `Spotify.kt`: media controls for the Spotify app, link handling
- `AlarmScheduler.kt` / `Receivers.kt`: scheduling, re-arming after a restart
- `AlarmStore.kt`: saved settings

Open the folder in Android Studio to build it. No third-party libraries. Not affiliated with Spotify.
