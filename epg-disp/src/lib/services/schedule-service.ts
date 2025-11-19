export interface EPGData {
  channels: Array<{
    uuid: string
    title: string
    logo?: string
    position: { width: number; height: number }
  }>
  programs: Array<{
    id: string
    channelUuid: string
    title: string
    description?: string
    since: string
    till: string
    image?: string
  }>
}

class ScheduleService {
  private currentData: EPGData = { channels: [], programs: [] }
  private listeners: Array<(data: EPGData) => void> = []

  getCurrentData(): EPGData {
    return this.currentData
  }

  updateSchedule(jsonData: string) {
    try {
      const data = JSON.parse(jsonData)
      this.currentData = data
      this.notifyListeners()
    } catch (error) {
      console.error('Failed to parse schedule data:', error)
    }
  }

  onEPGDataUpdate(callback: (data: EPGData) => void) {
    this.listeners.push(callback)
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback)
    }
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.currentData))
  }
}

export const scheduleService = new ScheduleService()
export type { EPGData }