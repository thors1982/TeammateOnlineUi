import { UserProfile } from '../user-profile/user-profile';
import { GameAccount } from '../game-accounts/game-account';

export interface Search {
    userProfiles: UserProfile[];
    gameAccounts: GameAccount[];
}
