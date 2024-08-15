import { useState, useEffect, useMemo } from 'react';
import { FetchLaunchPads, FetchLaunchs } from '../../lib/space-mission';
import DropDown, { DropDownOption } from '../drop-down';
import MatchMediaWrapper from '../match-media-wrapper';
import './mission.css';
import type {Launch, LaunchPad} from './types';

const g_linksLabel = {
  mission_patch: null, // Not displaying
  reddit_campaign: 'Reddit Campaign',
  reddit_launch: 'Reddit Launch',
  reddit_recovery: 'Reddit Recovery',
  reddit_media: 'Reddit Media',
  presskit: 'Rress Kit',
  article_link: 'Article',
  video_link: 'Watch Video'
};

export default function Missions() {
  const [launchs, setLaunchs] = useState<Array<Launch>>([]);
  const [launchPads, setLaunchPads] = useState<Array<LaunchPad>>([]);
  const [displayLaunchs, setDisplayLaunchs] = useState<Array<Launch>>([]);

  const loadLaunches = async() => {
    const ls = await FetchLaunchs();
    if (ls) {
      setLaunchs (ls);
      setDisplayLaunchs (ls);
    }
  }

  const loadLaunchePads = async()=>{
    const lds = await FetchLaunchPads();
    if (lds) setLaunchPads (lds);
  }

  useEffect(()=>{
    loadLaunches();
  },[]);

  useEffect(()=>{
    loadLaunchePads();
  },[]);

  const getYearsReducer = (a: Set<string>, c: Launch)=>{
    const date = new Date(c.launch_date_local);
    a.add ( date.getFullYear().toString() );
    return a;
  }

  const availableYears = useMemo(()=>{
    const initSet: Set<string> = new Set();
    const yearSet = launchs.reduce (getYearsReducer, initSet);
    //const yearArray = Array.from (yearSet); // IE11 don't support Array.from 
    const years: Array<string> = [];
    yearSet.forEach (function(year) {
      years.push(year);
    });
    return years;
  }, [launchs]);

  const filterMissions = (keywords: string, 
                          lPad: string, 
                          minY: string, 
                          maxY: string) =>{

    keywords = keywords.trim();
    const keywordsIsNumber = !isNaN (Number(keywords)); // including '', ' '

    const filterM = launchs.filter ((mission) => {
      const flight_number = mission.flight_number; 
      const rocket_name = mission.rocket.rocket_name.toLowerCase(); 
      const payload_ids = mission.payloads.reduce((a,c)=> a+c.payload_id, '').toLowerCase();
      const launchPad_id = mission.launch_site.site_id;
      const date = new Date(mission.launch_date_local);
      const launch_year = date.getFullYear();
      
      let bKeywords, bLPad, bMinYear, bMaxYear = false;
      keywords = keywords.toLowerCase();
      // keywords matches flight numbers
      if (keywords === ''){
        bKeywords = true;
      }
      else if (keywordsIsNumber) {
        if (parseInt(keywords) === flight_number ) bKeywords = true;
      }
      else{
        // keywords have any word in rocket name OR in payload id.
        bKeywords = rocket_name.includes(keywords) || 
                    payload_ids.includes(keywords);
      }

      // missions launched from the selected launch pad.
      if (lPad === 'Any'){
        bLPad = true;
      }
      else{
        bLPad = (lPad === launchPad_id);
      }

      if (minY === 'Any'){
        bMinYear = true;
      } else{
        bMinYear = (launch_year >= parseInt(minY, 10)); 
      }
      if (maxY === 'Any'){
        bMaxYear = true;
      }else{
        bMaxYear = (launch_year <= parseInt(maxY, 10));
      }
      // console.log(keywords+'-'+lPad+ '-'+ minYear+'-'+ maxYear)
      // console.log(bKeywords)
      // console.log(bLPad )
      // console.log(bMinYear )
      // console.log(bMaxYear)
      return bKeywords && bLPad && bMinYear && bMaxYear;
    });
    // console.log('filterMissions: ');
    // console.log(filterM);
    setDisplayLaunchs (filterM);
  }

  return (
    <div className='Mission-container' id='mission-container'>
      <MissionSearch lPads={launchPads} years={availableYears} onApply={filterMissions}/>
      <MissionList launchs={displayLaunchs} launchPads={launchPads} />
    </div>
  )
}

function MissionSearch ({
  lPads, years, onApply
}: {
  lPads: Array<LaunchPad>;
  years: Array<string>;
  onApply: (keywords: string, 
            lPad: string, 
            minY: string, 
            maxY: string) => void;
}) {
  const [keywords, setKeywords] = useState ('');
  const [launchPad, setLaunchPad] = useState({label: 'Any', value: 'Any'});
  const [minYear, setMinYear] = useState ({label: 'Any', value: 'Any'});
  const [maxYear, setMaxYear] = useState ({label: 'Any', value: 'Any'});

  const lpOptions = lPads ? lPads.map(pad=>({label: pad.full_name, value: pad.id})) : [];
  lpOptions.unshift ({label: 'Any', value: 'Any'})
  //console.log(lpOptions);
  const yearOptions = years ? years.map(year=>({label: year+'', value: year})) : [];
  yearOptions.unshift ({label: 'Any', value: 'Any'})
  //console.log(yearOptions); 

  const handleKeywords = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setKeywords (e.target.value);
  }
  const handleLaunchPad = (option: DropDownOption) =>{
    setLaunchPad (option);
  }
  const handleMinYear = (option: DropDownOption) =>{
    setMinYear (option);
  }
  const handleMaxYear = (option: DropDownOption) =>{
    setMaxYear (option);
  }
  const handleApply = ()=>{
    if ((minYear.value !== 'Any' || maxYear.value !== 'Any') && 
         parseInt(minYear.value) > parseInt(maxYear.value)){
      alert(" The year range is invalid, please double check it!");
    }else{
      onApply(keywords, launchPad.value, minYear.value, maxYear.value);
    }
  }
  return (
    <div className="Search-container">
      <div className='keyworks'>
        <div className="searchLabel">Keywords</div>
        <input type='text' value={keywords} placeholder='eg Falcon' onChange={handleKeywords}></input>
      </div>
      <div className='launchPad'>
        <div className="searchLabel">Launch Pad</div>
        <DropDown options={lpOptions} currentOption={launchPad} onChange={handleLaunchPad} />
      </div>
      <div className='minYear'>
        <div className="searchLabel">Min Year</div>
        <DropDown options={yearOptions} currentOption={minYear} onChange={handleMinYear} />
      </div>
      <div className='maxYear'>
        <div className="searchLabel">Max Year</div>
        <DropDown options={yearOptions} currentOption={maxYear} onChange={handleMaxYear} />
      </div>
      <div className='apply'>
        <div className="searchLabel">&nbsp;&nbsp;&nbsp;</div>
        <button className='button' onClick={handleApply}>Apply</button>
      </div>
    </div>
  )
}

function MissionList({
  launchs, launchPads
}: {
  launchs: Array<Launch>;
  launchPads: Array<LaunchPad>;
}) {

  const missionCount = launchs.length;

  //console.log(launchs);
  const displayMissionItems = launchs.map((launch, index)=>{
    let comp;
    if (index < missionCount - 1){
      comp = (<>
        <MissionItem 
          key={launch.flight_number} 
          mission={launch} 
          launchPads={launchPads}
        />
        <div className='mi-spacer'/>
      </>)
    }else{
      comp = (<>
        <MissionItem 
          key={launch.flight_number} 
          mission={launch}
          launchPads={launchPads}
        />
      </>)
    }
    return comp;
  })
  
  return(
    <div className="missionlist-container" id='missionlist-container'>
      <div className='mi-count'>Showing {missionCount} Missions</div>
      {displayMissionItems}
    </div>
  )
}

function MissionItem({
  mission, 
  launchPads
}: {
  mission: Launch;
  launchPads: Array<LaunchPad>; 
}){
  const imgAlt = mission.rocket.rocket_name + ' Logo';
  const success = (mission.launch_success && mission.land_success) ? 
                  '' : (<i>Failed Mission</i>);
  const payloadIds = mission.payloads.reduce((a,c)=> a? a+' - '+c.payload_id : c.payload_id, '');
  const title = mission.rocket.rocket_name + ' - ' + payloadIds + (success ? ' - ':'');
  const launchDate = new Date (mission.launch_date_local);
  const dateTimeFormat: Intl.DateTimeFormatOptions  = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  };
  const displayDate = (<b>{launchDate.toLocaleDateString('en-US', dateTimeFormat)}</b>);
  const displayTime = (<b>{launchDate.toLocaleTimeString()}</b>);
  let launchPadName: React.ReactElement | null = null;
  for (const pad of launchPads){
    if (pad.id === mission.launch_site.site_id){
      launchPadName = (<b>{pad.full_name}</b>);
      break;
    }
  }
  const createLinksButton = (linksObject: Launch["links"]) => {
    const links = [];
    let foundLabel = false; 
    for (const [linkKey, linkContent] of Object.entries(linksObject)){
      foundLabel = false;
      for (const [labelKey, labelContent] of Object.entries(g_linksLabel)){
        if (linkKey === labelKey){
          if (labelContent && linkContent){
            links.push(<a href={linkContent}>
              <div className="mi-button">
                {labelContent}
              </div>
            </a>)
          }
          foundLabel = true;
          break;
        }
      }
      if (!foundLabel) {
        links.push(<a href={linkContent}>
          <div className="mi-button">
            {linkKey}
          </div>
        </a>)
      }
    }
    return links;
  }

  const linkButtons = createLinksButton (mission.links);
  const flightNumber = '#' + mission.flight_number;
  const wideScreenContent = (
    <div className='missionitem-container'>
      <div className='missionitem-icon'>
        <img alt={imgAlt} src={mission.links.mission_patch}/>
      </div>
      <div className="missionitem-info">
        <div className="mi-title">{title} {success}</div>
        <div className="mi-subtitle">
          Launched on {displayDate} at {displayTime} from {launchPadName}
        </div>
        <div className="mi-links">
          {linkButtons}
        </div>
      </div>
      <div className="missionitem-id">
        {flightNumber}
      </div>
    </div>
  );

  const narrowScreenContent = (
    <div className='missionitem-container-s'>
      <div className='missionitem-icon-id-container-s'>
        <div className='missionitem-icon-s'>
          <img alt={imgAlt} src={mission.links.mission_patch}/>
        </div>      
        <div className="missionitem-id-s">
          {flightNumber}
        </div>
      </div>
      <div className="missionitem-info-s">
        <div className="mi-title">{title} {success}</div>
        <div className="mi-subtitle">Launched on {displayDate} at {displayTime} from {launchPadName}</div>
        <div className="mi-links">
          {linkButtons}
        </div>
      </div>
    </div>
  )

  return <MatchMediaWrapper 
    mobileContent={narrowScreenContent} 
    desktopContent={wideScreenContent}
  />
}

