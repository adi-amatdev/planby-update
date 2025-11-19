import React, { useMemo, useState } from "react"
import { channels } from "@/lib/helpers/channels"
import { epg } from "@/lib/helpers/epg"
import { useEpg } from "planby"
import { Epg, Layout, ChannelBox, ChannelLogo, ProgramBox, ProgramContent, ProgramFlex, ProgramStack, ProgramTitle, ProgramText, useProgram } from "planby"

const ProgramItem = ({ program, ...rest }) => {
  const { styles, formatTime } = useProgram({ program, ...rest })
  const { data } = program
  const { title, since, till } = data
  
  return (
    <ProgramBox width={styles.width} style={styles.position}>
      <ProgramContent width={styles.width}>
        <ProgramFlex>
          <ProgramStack>
            <ProgramTitle>{title}</ProgramTitle>
            <ProgramText>{formatTime(since)} - {formatTime(till)}</ProgramText>
          </ProgramStack>
        </ProgramFlex>
      </ProgramContent>
    </ProgramBox>
  )
}

const ChannelItem = ({ channel }) => {
  const { position, logo, title } = channel
  return (
    <ChannelBox {...position}>
      <ChannelLogo src={logo || '/placeholder-logo-epg.svg'} alt="Logo" />
      <span>{title}</span>
    </ChannelBox>
  )
}

export function EPGView() {
  const [nowDate, setNowDate] = useState<Date>(new Date())
  
  const epgStart = useMemo(() => {
    return new Date(Math.min(...epg.map(p => new Date(p.since).getTime())))
  }, [])
  
  const epgEnd = useMemo(() => {
    return new Date(Math.max(...epg.map(p => new Date(p.till).getTime())))
  }, [])
  
  const { getEpgProps, getLayoutProps } = useEpg({
    channels,
    epg,
    startDate: epgStart,
    endDate: epgEnd,
    nowDate,
    sidebarWidth: 200,
    itemHeight: 100,
    isSidebar: true,
    isTimeline: true,
    isLine: true,
    hourWidth: 500,
    dayWidth:1200 
  })

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div style={{ padding: '10px', background: '#f0f0f0', borderBottom: '1px solid #ccc' }}>
        <button onClick={() => setNowDate(new Date())} style={{ marginRight: '10px' }}>
          Current Time
        </button>
        <button onClick={() => setNowDate(new Date(epgStart.getTime() + 2 * 60 * 60 * 1000))} style={{ marginRight: '10px' }}>
          EPG Start + 2h
        </button>
        <span>Live Bar Time: {nowDate.toLocaleTimeString()}</span>
      </div>
      <Epg {...getEpgProps()}>
        <Layout 
          {...getLayoutProps()}
          renderChannel={({ channel }) => (
            <ChannelItem key={channel.uuid} channel={channel} />
          )}
          renderProgram={({ program, ...rest }) => (
            <ProgramItem key={program.data.id} program={program} {...rest} />
          )}
        />
      </Epg>
    </div>
  )
}