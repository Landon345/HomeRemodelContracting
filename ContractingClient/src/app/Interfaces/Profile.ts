import {Skill} from './Skill';

export class Profile {
    username: string;
    email: string;
    password: string;
    company_name: string;
    rating: number;
    phonenumber:string;
    city: string;
    state:string;
    number_of_ratings: number;
    profile_description: string;
    picture_path: string;
    years_experience: number;
    profile_skills: Skill[]
}