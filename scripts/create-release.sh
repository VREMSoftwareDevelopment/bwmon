#!/bin/sh
TARGZFILE=bwmon.tar.gz

rm -f $TARFILE

cd dist
cp ../server/bwmon*.sh .
GZIP=-9 tar -zcvf $TARGZFILE bwmon*.sh index.html css js
cd ..

