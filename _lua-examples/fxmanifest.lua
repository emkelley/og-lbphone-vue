fx_version "cerulean"
game "gta5"

title "OG App Template"
description "An app template for the LB Phone."
author "0NEGUY"

client_script "client.lua"

files {
    "ui/dist/**/*"
}

ui_page "http://localhost:3000" -- LOCAL DEVELOPMENT
-- ui_page "dist/index.html" -- PRODUCTION/BUILT FILES
