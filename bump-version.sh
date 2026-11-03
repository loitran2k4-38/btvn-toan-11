#!/bin/sh
# Đổi số phiên bản trong link CSS/JS để trình duyệt của học sinh luôn tải bản mới.
# Chạy trước mỗi lần commit có sửa assets/ hoặc data/:  sh bump-version.sh
V=$(date +%Y%m%d%H%M)
sed -i.bak -E "s/\?v=[0-9]+/?v=$V/g; s/window\.APP_VERSION = \"[0-9]+\"/window.APP_VERSION = \"$V\"/" index.html bai.html && rm -f index.html.bak bai.html.bak
echo "Phiên bản mới: $V"
