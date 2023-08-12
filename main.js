"use strict"

document.addEventListener("DOMContentLoaded", () => {
    let getBlogs = () => {
        fetch('http://127.0.0.1:8000/api/blogs/')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            buildBlogs(data);
        })
    }
    getBlogs();

    let buildBlogs = (blogs) => {
        let blogsWrapper = document.querySelector('#blogs--wrapper');
        blogsWrapper.innerHTML = '';

        blogs.forEach(blog => {
            let blogCard = `
                <div class="blog--card">
                    <img src="${blog.image_blog}"/>

                    <div>
                        <div class="card--header">
                            <h3>${blog.title}</h3>
                            <strong class="vote--option" data-vote="True" data-blog="${blog.id}">&#128522;</strong><strong>${blog.ann_likes}</strong>
                        </div>
                        <p>${blog.text}</p>
                    </div>
                </div>
            `
        blogsWrapper.innerHTML += blogCard;
        })
        addVoteEvents();
    }

    let addVoteEvents = () => {
    let voteBtns = document.querySelectorAll('.vote--option')
    voteBtns.forEach((vote, i) =>{
        vote.addEventListener('click', (e) => {
            let token = 'YOUR TOKEN'
            let vote = e.target.dataset.vote
            let blog = e.target.dataset.blog
            console.log(vote)
            fetch(`http://127.0.0.1:8000/api/blog_relation/${blog}/`, {
                method: 'PATCH',
                headers: {'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({'like': vote})
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
        })
    })
}

})