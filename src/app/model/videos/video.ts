export class  Video {

    constructor(
        public id: number = 1,
        public title: string = '',
        public description: string = '',
        public status: string = 'public',
        public imagen: string = null,
        public videoPath = null,
        public createdAt = null,
        public updatedAt = null
    ) {}
}