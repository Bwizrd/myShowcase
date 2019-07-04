Bulma & Gulp Starter

npm start for DEV

gulp for PROD


Gulp File Completed

Deploy to Dev Server GoDaddy - paulleppard.uk

Full
scp -r dist  ml2rhvgma7ol@160.153.133.188:/home/ml2rhvgma7ol/public_html/bulmagulp

New Files Only
rsync -ru dist/* ml2rhvgma7ol@160.153.133.188:/home/ml2rhvgma7ol/public_html/bulmagulp/ -v

Deploy to Dev Server Siteground - pans-house.com/bulmagulp

scp -P 18765 -r dist  panshous@uk47.siteground.eu:/home/panshous/public_html/bulmagulp

rsync -P 18765 -ru dist/* panshous@uk47.siteground.eu:/home/panshous/public_html/bulmagulp/ -v