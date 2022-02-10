import React, { Component } from 'react'


export default class Homepage extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <div className="d-flex align-items-center p-3 my-3 text-while-50 rounded shadow-sm">
                    <div>
                        <h6 className="mb-0 text-white">Bootstrap</h6>
                        <small>Since 2011</small>
                    </div>
                </div>

                <div className="my-3 p-3 bg-white rounded shadow-sm">
                    <h6 className="border-bottom border-gray pb-2 mb-0">Recent updates</h6>
                    <div className="media text-muted pt-3">
                        <svg className="bd-placeholder-img mr-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false">
                            <title>Placeholder</title>
                            <rect width="100%" height="100%" fill="#007bff"></rect>
                            <text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text>
                        </svg>

                        <p className="media-body pb-3 mb-0 small border-bottom border-gray">
                            <strong className="d-block text-gray-dark">@username</strong>
                            Playing ping pong all night long, everything's all neon and hazy.
                            Yeah, she's so in demand. She's sweet as pie but if you break her heart.
                             But down to earth. It's time to face the music I'm no longer your muse.
                              I guess that I forgot I had a choice.
                        </p>
                    </div>

                </div>
                <div className="my-3 p-3 bg-white rounded shadow-sm">
                    <div className="media text-muted pt-3">
                        <svg className="bd-placeholder-img mr-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false">
                            <title>Placeholder</title>
                            <rect width="100%" height="100%" fill="#007bff"></rect>
                            <text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text>
                        </svg>

                        <p className="media-body pb-3 mb-0 small border-bottom border-gray">
                            <strong className="d-block text-gray-dark">@username</strong>
                            Standing on the frontline when the bombs start to fall.
                            Heaven is jealous of our love, angels are crying from up above.
                            Can't replace you with a million rings. Boy, when you're with me
                            I'll give you a taste. There’s no going back. Before you met me
                            I was alright but things were kinda heavy. Heavy is the head
                            that wears the crown.
                        </p>
                    </div>
                </div>

                <div className="my-3 p-3 bg-white rounded shadow-sm">
                    <h6 className="border-bottom border-gray pb-2 mb-0">Suggestions</h6>
                    <div className="media text-muted pt-3">
                        <svg className="bd-placeholder-img mr-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false">
                            <title>Placeholder</title>
                            <rect width="100%" height="100%" fill="#007bff">
                            </rect>
                            <text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text>
                        </svg>

                        <div className="media-body pb-3 mb-0 small border-bottom border-gray">
                            <div className="d-flex justify-content-between align-items-center w-100">
                                <strong className="text-gray-dark">Full Name</strong>
                                <a href="#">Follow</a>
                            </div>
                            <span className="d-block">@username</span>
                        </div>
                    </div>
                    <div className="media text-muted pt-3">
                        <svg className="bd-placeholder-img mr-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false">
                            <title>Placeholder</title>
                            <rect width="100%" height="100%" fill="#007bff">
                            </rect>
                            <text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text>
                        </svg>

                        <div className="media-body pb-3 mb-0 small border-bottom border-gray">
                            <div className="d-flex justify-content-between align-items-center w-100">
                                <strong className="text-gray-dark">Full Name</strong>
                                <a href="#">Follow</a>
                            </div>
                            <span className="d-block">@username</span>
                        </div>
                    </div>

                    <div className="media text-muted pt-3">
                        <svg className="bd-placeholder-img mr-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false">
                            <title>Placeholder</title>
                            <rect width="100%" height="100%" fill="#007bff">
                            </rect>
                            <text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text>
                        </svg>

                        <div className="media-body pb-3 mb-0 small border-bottom border-gray">
                            <div className="d-flex justify-content-between align-items-center w-100">
                                <strong className="text-gray-dark">Full Name</strong>
                                <a href="#">Follow</a>
                            </div>
                            <span className="d-block">@username</span>
                        </div>
                    </div>

                    <small className="d-block text-right mt-3">
                        <a href="#">All suggestions</a>
                    </small>
                </div>
            </div>
        )
    }

}
