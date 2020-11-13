export class RoomModel {
    constructor (
        public poke_name: string,
        public gym_name: string,
        public place: string,
        public match_hour: Date,
        public host: RoomMember,
        public id?: string,
        public placed_members?: RoomMember[],
        public remote_members?: RoomMember[],
        public invited_members?: InvitedMember[],
        public cords?: Cords,
    ) {
        
    }
}

export interface User {
    email: string,
    uid: string,
}

export interface RoomMember {
    nickname: string,
    pg_code?: string,
}

export interface InvitedMember {
    nickname: string,
    pg_code?: string,
    by: string
}

export interface Cords {
    lat: number,
    long: number
}

