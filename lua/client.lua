local identifier = "og-lbphone-vue"

while GetResourceState("lb-phone") ~= "started" do
    Wait(500)
end

local function addApp()
    local added, errorMessage = exports["lb-phone"]:AddCustomApp({
        identifier = identifier, -- unique app identifier

        name = "OG App Template",
        description = "An app template for the LB Phone.",
        developer = "0NEGUY",

        defaultApp = false, --  set to true, the app will automatically be added to the player's phone
        size = 9812,        -- the app size in kb
        -- price = 0, -- OPTIONAL make players pay with in-game money to download the app

        images = { -- OPTIONAL array of screenshots of the app, used for showcasing the app
            "https://cfx-nui-" .. GetCurrentResourceName() .. "/dist/screenshot-light.png",
            "https://cfx-nui-" .. GetCurrentResourceName() .. "/dist/screenshot-dark.png"
        },

        ui = "http://localhost:3000", -- LOCAL DEVELOPMENT
        -- ui = GetCurrentResourceName() .. "/dist/index.html" -- PRODUCTION/BUILT FILES

        icon = "https://cfx-nui-" .. GetCurrentResourceName() .. "/dist/icon.png",
        fixBlur = true -- set to true if you use em, rem etc instead of px in your css
    })

    if not added then
        print("Could not add app:", errorMessage)
    end
end

addApp()

AddEventHandler("onResourceStart", function(resource)
    if resource == "lb-phone" then
        addApp()
    end
end)

local directions = { "N", "NE", "E", "SE", "S", "SW", "W", "NW" }
local oldYaw = 0
local oldDirection = "0° N"
local oldPosition = { x = 0, y = 0, z = 0 }
local isAppOpen = false

-- Listen for app visibility changes
RegisterNUICallback("appOpened", function(data, cb)
    isAppOpen = true
    cb("ok")
end)

RegisterNUICallback("appClosed", function(data, cb)
    isAppOpen = false
    cb("ok")
end)

RegisterNUICallback("getDirection", function(data, cb)
    cb(oldDirection)
end)

RegisterNUICallback("getPosition", function(data, cb)
    local ped = PlayerPedId()
    local coords = GetEntityCoords(ped)
    cb({
        x = math.floor(coords.x * 100) / 100,
        y = math.floor(coords.y * 100) / 100,
        z = math.floor(coords.z * 100) / 100
    })
end)

RegisterNUICallback("drawNotification", function(data, cb)
    BeginTextCommandThefeedPost("STRING")
    AddTextComponentSubstringPlayerName(data.message)
    EndTextCommandThefeedPostTicker(false, false)

    cb("ok")
end)

CreateThread(function()
    while true do
        if isAppOpen then
            Wait(25)

            local ped = PlayerPedId()
            local coords = GetEntityCoords(ped)
            local yaw = math.floor(360.0 - ((GetFinalRenderedCamRot(0).z + 360.0) % 360.0) + 0.5)

            if yaw == 360 then
                yaw = 0
            end

            -- Round position to 2 decimal places for comparison
            local newX = math.floor(coords.x * 100) / 100
            local newY = math.floor(coords.y * 100) / 100
            local newZ = math.floor(coords.z * 100) / 100

            -- Check if position changed significantly (more than 1 unit)
            local positionChanged = math.abs(newX - oldPosition.x) > 1 or
                math.abs(newY - oldPosition.y) > 1 or
                math.abs(newZ - oldPosition.z) > 1

            -- get closest direction
            local directionChanged = oldYaw ~= yaw

            if directionChanged then
                oldYaw = yaw
                oldDirection = yaw .. "° " .. directions[math.floor((yaw + 22.5) / 45.0) % 8 + 1]

                exports["lb-phone"]:SendCustomAppMessage(identifier, {
                    type = "updateDirection",
                    direction = oldDirection
                })
            end

            if positionChanged then
                oldPosition = { x = newX, y = newY, z = newZ }

                exports["lb-phone"]:SendCustomAppMessage(identifier, {
                    type = "updatePosition",
                    position = oldPosition
                })
            end
        else
            Wait(1500) -- Sleep longer when app is closed
        end
    end
end)
