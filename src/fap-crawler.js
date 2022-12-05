const mondayText = document.querySelector("#aspnetForm > table > tbody > tr:nth-child(1) > td > div > table > thead > tr:nth-child(2) > th:nth-child(1)").innerText.split("/")
const monday = new Date()
monday.setDate(parseInt(mondayText[0]))
monday.setMonth(parseInt(mondayText[1]) - 1)

const table = document.querySelector("#aspnetForm > table > tbody > tr:nth-child(1) > td > div > table > tbody").children

const data = []

for(let slot = 0; slot < table.length; slot++){
    const row = table[slot].children
    for(let j = 0; j < row.length; j++){
        if (row[j].children.length === 0) continue

        let date = new Date(monday)
        date.setDate(date.getDate() + j - 1)

        let timeText = row[j].querySelector("p span.label").innerText.substring(1).split("-")[0].split(":")
        date.setHours(parseInt(timeText[0]))
        date.setMinutes(parseInt(timeText[1]) - 10) // notice before 10 minutes
        date.setSeconds(0)

        let subject = row[j].querySelector("p a:nth-child(1)").innerText.slice(0, -1)
        let place = row[j].querySelector("p").innerText
        place = place.substring(place.indexOf("at ") + 3).match(/^((Sân trường [0-9])|\S+)( |\n)/igu)

        let online = row[j].querySelector(".online-indicator") !==  null

        //console.log("Slot %d Môn %s Ngày %s Tại %s Online ? %v", slot + 1, subject, date.toString(), place, online)

        data.push({
            "slot": slot + 1,
            "subject": subject,
            "date": date.toString(),
            "place": place,
            "online": online
        })
    }
}

console.log(JSON.stringify(data))
