interface Video {
    id: string;
    title: string;
    description: string;
    likes?: number;
    dislikes?: number;
    tags?: string[];//should be a set of strings
    //private VideoStatus videoStatus;
    //private Integer viewCount;
    //private String thumbnailURL;
    //private String videoUrl;
    //private List<Comment> commentList;
}