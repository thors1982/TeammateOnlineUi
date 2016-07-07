import {UserProfile} from './user-profile';

export class Friend {
    id: number;
    userProfileId: number;
    friendUserProfileId: number;
    createdDate: string;
    modifiedDate: string;

    friendUserProfile: UserProfile;
}
