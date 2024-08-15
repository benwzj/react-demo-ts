import SpaceHeader from '../components/space-mission/space-header';
import Missions from '../components/space-mission/missions';
import SpaceFooter from '../components/space-mission/space-footer';
import './space-mission.css';

export default function SpaceMissionPage() {
  return (
    <div className="SpaceMission">
      <SpaceHeader/>
      <Missions/>
      <SpaceFooter/>
    </div>
  );
}

