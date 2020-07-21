export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike(id, title, author, img) {
        const like = { id, title, author, img };
        this.likes.push(like);

        //update localstorage
        this.persistData();

        return like;
    }

    deleteLike(id) {
        const index = this.likes.findIndex(e => e.id === id);
        this.likes.splice(index, 1);

        //update localstorage
        this.persistData();
    }

    isLiked(id){
        return this.likes.findIndex(e=>e.id === id) !== -1;
    }

    getNumLikes() {
        return this.likes.length;
    }

    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('likes'));

        //restore from localstorage
        if (storage) this.likes = storage;
    }
}