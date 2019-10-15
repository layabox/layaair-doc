#Animation playing status acquisition

###### *version :2.1.0beta   Update:2019-6-13*

To get the animation playing status, you only need to use Animator's**GetCurrent Animator PlayState**Method.

![] (img/1.png)<br> (Figure 1)

Acquired`AnimatorPlayState`:

![] (img/2.png)<br> (Figure 2)

#####When the animation is non-circular

If the comment is the same as the animation is**Non circulation**When playing, the normalized Time will return a number of 0.0-1, which means that the current animation has been played to 100% or has been played. This number can be understood as the percentage of the current animation playing, and 0.1 is the current 10%.

#####When the animation is played in a loop

This value will be + 1 after each playback, that is, how many times has the integer bit finished playing the current playback animation, and the decimal bit is the percentage of the current playback animation. For example, if the circular animation is played three times, the number should be 3.0. When the fourth time is played half, the number should be 3.5.
