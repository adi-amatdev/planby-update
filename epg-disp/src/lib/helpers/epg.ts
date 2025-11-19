// Generate EPG data for current system date/time
const now = new Date()
const currentHour = now.getHours()
const currentMinute = now.getMinutes()

// Helper to create time slots
const createTimeSlot = (channelUuid: string, id: string, title: string, description: string, hourOffset: number, duration: number) => {
  const startTime = new Date(now)
  startTime.setHours(currentHour + hourOffset, 0, 0, 0)
  
  const endTime = new Date(startTime)
  endTime.setHours(startTime.getHours() + duration)
  
  return {
    id,
    channelUuid,
    title,
    description,
    since: startTime.toISOString(),
    till: endTime.toISOString(),
    image: `/program-${id}.jpg`
  }
}

export const epg = [
  // CNN Programs
  createTimeSlot("channel-1", "1", "CNN Breaking News", "Latest breaking news coverage", -2, 1),
  createTimeSlot("channel-1", "2", "Anderson Cooper 360", "In-depth news analysis", -1, 1),
  createTimeSlot("channel-1", "3", "CNN Tonight", "Evening news program", 0, 2),
  createTimeSlot("channel-1", "4", "The Situation Room", "Political news and analysis", 2, 1),
  
  // BBC News Programs  
  createTimeSlot("channel-2", "5", "BBC World News", "International news coverage", -2, 1),
  createTimeSlot("channel-2", "6", "BBC Business Live", "Business and financial news", -1, 1),
  createTimeSlot("channel-2", "7", "BBC News at Six", "Evening news bulletin", 0, 1),
  createTimeSlot("channel-2", "8", "Newsnight", "Current affairs program", 1, 2),
  
  // ESPN Programs
  createTimeSlot("channel-3", "9", "SportsCenter", "Sports news and highlights", -2, 1),
  createTimeSlot("channel-3", "10", "NBA Tonight", "Basketball coverage", -1, 2),
  createTimeSlot("channel-3", "11", "Monday Night Football", "Live football game", 1, 3),
  
  // Discovery Programs
  createTimeSlot("channel-4", "12", "How It's Made", "Manufacturing processes", -2, 1),
  createTimeSlot("channel-4", "13", "MythBusters", "Science experiments", -1, 1),
  createTimeSlot("channel-4", "14", "Deadliest Catch", "Crab fishing reality show", 0, 2),
  createTimeSlot("channel-4", "15", "Gold Rush", "Gold mining reality show", 2, 2),
  
  // National Geographic Programs
  createTimeSlot("channel-5", "16", "Wild Kingdom", "Wildlife documentary", -2, 1),
  createTimeSlot("channel-5", "17", "Explorer", "Adventure documentary", -1, 1),
  createTimeSlot("channel-5", "18", "Cosmos", "Science documentary series", 0, 2),
  createTimeSlot("channel-5", "19", "Life Below Zero", "Survival documentary", 2, 2),
]