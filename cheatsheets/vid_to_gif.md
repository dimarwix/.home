
# Cut and convert video to gif

Convert video segment to gif.
requires ffmpeg and imagemagick.

```bash
# cut video:
ffmpeg -ss 783 -t 18 -i source.mp4 -sameq cut.mp4

# convert segment video to frames
ffmpeg -i cut.mp4 frame%04d.gif

# create animated gif
convert -delay 1 -loop 0 frame*.gif anim.gif
# or with reverse
convert frame*.gif -set delay 1 -reverse frame*.gif -set delay 1 -loop 0 anim_with_reverse.gif

# remove 66 from bottom and top
convert anim_with_reverse.gif -shave 0x66 anim_with_reverse_cropped.gif
# or crop height to 410 starting at 66
convert anim_with_reverse.gif -crop x410+0+66 +repage anim_with_reverse_cropped.gif
```