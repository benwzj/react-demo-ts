
type Rocket = {
  rocket_id: string;
  rocket_name: string;
  rocket_type: string;
};
type Telemetry = {
  flight_club: string | null;
}
type Launch_site = {
  site_id: string;
  site_name: string;
};
type Payload = {
  payload_id: string,
  customers: Array<string>;
  payload_type: string,
  payload_mass_kg: number,
  payload_mass_lbs: number,
  orbit: string;
};
type Links = {
  mission_patch: string;
  article_link: string;
  video_link: string;
};
export type Launch =  {
  flight_number: number;
  launch_date_local: string;
  rocket: Rocket;
  telemetry: Telemetry;
  core_serial: string,
  cap_serial: string | null;
  launch_site: Launch_site;
  payloads: Array<Payload>;
  launch_success: boolean;
  reused: boolean;
  land_success: boolean;
  landing_type: string | null;
  landing_vehicle: string | null;
  links: Links;
  details: string;
};

type Location = {
  name: string;
  region: string;
  latitude: number;
  longitude: number;
}

export type LaunchPad = {
  id: string;
  full_name: string;
  status: string;
  location: Location;
  vehicles_launched: string,
  details: string;
};

