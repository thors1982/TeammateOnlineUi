import {UserProfile} from '../user-profile/user-profile';

export class FriendRequest {
    id: number;
    userProfileId: number;
    friendUserProfileId: number;
    note: string;
    isPending: boolean;
    isAccepted: boolean;
    isIncomingRequest: boolean;
    createdDate: string;
    modifiedDate: string;

    userProfile: UserProfile;
    friendUserProfile: UserProfile;
}
