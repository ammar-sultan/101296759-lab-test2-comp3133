export class Mission {
    flight_number!: number;
    mission_id!: number;
    mission_name!: string;
    launch_year!: number;
    details!: string;
    links!: {
        mission_patch_small: string;
        wikipedia: string;
        video_link: string;
        article_link: string

    };
    rocket!: {
        rocket_name: string;
        rocket_type: string;
        first_stage: {
            cores: [
                {
                    flight: number
                    landing_intent: boolean;
                }
            ]
        }
    };
    launch_site!: {
        site_name_long: string
    };
    launch_success!: boolean
}