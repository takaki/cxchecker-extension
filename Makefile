PROJECT := cxchecker-extension
all: public/icon_16.png public/icon_19.png public/icon_48.png

public/icon_16.png: public/icon_128.png
	convert -resize 16x16 $< $@
public/icon_19.png: public/icon_128.png
	convert -resize 19x19 $< $@
public/icon_48.png: public/icon_128.png
	convert -resize 48x48 $< $@
public/icon_128.png: icon_128.xcf
	xcf2png $< > $@

public/popup.js: popup.tsx
	webpack --color --progress

dist: all
	rm -rf dist
	yarn build
	zip -r $(PROJECT).zip dist

.DEFAULT: all
.PHONY: all dist
