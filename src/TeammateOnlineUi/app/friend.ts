import {UserProfile} from './user-profile';

export interface Friend {
    id: number;
    userProfileId: number;
    friendUserProfileId: number;
    createdDate: string;
    modifiedDate: string;

    friendUserProfile: UserProfile;
}
