import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Seo from "../components/Seo";


export default function Home({ results }) {

    const router = useRouter();
    const onClick = (id, title) => {
        // router.push(`/movies/${id}`);
        router.push(
            {
                pathname: `/movies/${id}`,
                query: {
                    title,
                }
            },
            `/movies/${id}`  // query 파라미터를 숨길수 있다.
        );
    }

    return (
        <div className="container">
            <Seo title="Home" />
            {/* !movies && <h4>Loading...</h4> */}
            {results?.map((movie) => (
                <div onClick={() => onClick(movie.id, movie.original_title)} className="movie" key={movie.id}>
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
                    <h4>
                        <Link
                            href={{
                                pathname: `/movies/${movie.id}`,
                                query: {
                                    title: movie.original_title,
                                }
                            }}
                            as={
                                `/movies/${movie.id}`
                            }
                        >
                            <a>{movie.original_title}</a>
                        </Link>
                    </h4>
                </div>
            ))
            }
            <style jsx>{`
                .container {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    padding: 20px;
                    gap: 20px;
                }
                .movie {
                    cursor: pointer;
                }
                .movie img {
                    max-width: 100%;
                    border-radius: 12px;
                    transition: transform 0.2s ease-in-out;
                    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
                }
                .movie:hover img {
                    transform: scale(1.05) translateY(-10px);
                }
                .movie h4 {
                    font-size: 18px;
                    text-align: center;
                }
        `}</style>
        </div >
    );
}


// 이름이 정말중요하다. 
// 로딩화면이 보이지 않고 데이터 가져온것을 페이지 소스에서 보고 싶으면 
// 여기에서 실행되는건 백엔드에서 실행되기 때문에 클라이언트에서 절대 안보인다.  
export async function getServerSideProps() {
    const { results } = await (
        await fetch(
            "http://localhost:3000/api/movies"
        )
    ).json();

    return {
        props: {
            results
        }
    }
}