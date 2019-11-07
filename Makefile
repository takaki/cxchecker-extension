PROJECT := cxchecker-extension
all: icon_16.png icon_19.png icon_48.png bundle.js

icon_16.png: icon_128.png
	convert -resize 16x16 $< $@
icon_19.png: icon_128.png
	convert -resize 19x19 $< $@
icon_48.png: icon_128.png
	convert -resize 48x48 $< $@
icon_128.png: icon_128.xcf
	xcf2png $< > $@

bundle.js: popup.tsx
	webpack --color --progress

dist: all
	rm -rf $(PROJECT) $(PROJECT).zip
	mkdir $(PROJECT)
	cp -a *.png popup.html bundle.js cxchecker.ts manifest.json COPYRIGHT Makefile $(PROJECT)
	zip -r $(PROJECT).zip $(PROJECT)
	rm -rf $(PROJECT)

.DEFAULT: all
.PHONY: all dist
