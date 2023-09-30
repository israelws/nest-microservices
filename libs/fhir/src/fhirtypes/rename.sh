#!/bin/bash

declare -a arrFiles
declare -a fname
declare -a fversion

for file in ./*
do
    arrFiles=("${arrFiles[@]}" "$file")
done

idx=0
for f in "${arrFiles[@]}"
do
    extension="${f##*.*.}"
    fname=("${fname[@]}" "$(basename -s ".$extension" "${f}")")
    fversion=("${fversion[@]}" "${fname[idx]#*_[0-9]}")
#    echo ${fversion[idx]}
    idx=$((idx+1))
done

echo "FileName: " "${fname[@]%_*}"
echo "Version: " "${fversion[@]}"