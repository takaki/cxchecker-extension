PROJECT := cxchecker-extension
all: icon_16.png icon_19.png icon_48.png 3rdparty/jquery.min.js 3rdparty/jquery.xpath.js

icon_16.png: icon_128.png
	convert -resize 16x16 $< $@
icon_19.png: icon_128.png
	convert -resize 19x19 $< $@
icon_48.png: icon_128.png
	convert -resize 48x48 $< $@

icon_128.png: icon_128.xcf
	xcf2png $< > $@

3rdparty/jquery.min.js:
	wget -P 3rdparty \
		http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js 
3rdparty/jquery.xpath.js:
	wget -P 3rdparty \
		https://raw.github.com/jfirebaugh/jquery-xpath/master/jquery.xpath.js

dist: all
	rm -rf $(PROJECT) $(PROJECT).zip
	mkdir $(PROJECT)
	cp -a *.png popup.* *.js manifest.json COPYRIGHT Makefile 3rdparty $(PROJECT)
	zip -r $(PROJECT).zip $(PROJECT)
	rm -rf $(PROJECT)

.DEFAULT: all
.PHONY: all dist
