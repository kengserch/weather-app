export function formatTime(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000) // แปลงจากวินาทีเป็นมิลลิวินาที
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) // ตั้งค่าให้แสดงเฉพาะชั่วโมงและนาที
}

export function covertToCelsius(temp) {
    return (temp - 273.15).toFixed(0)
}