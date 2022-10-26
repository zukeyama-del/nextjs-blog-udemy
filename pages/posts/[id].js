// /pages/posts/[id].jsページを作成。
//必要なもの(reactコンポーネント、getStaticPaths, getStaticProps)

import Layout from "../../components/Layout";


import Head from "next/head";

import utilStyles from "../../styles/utils.module.css";
import { getAllPostIds, getPostData } from "../../post.js/post";

//動的ルーティング設定のための関数。pathsがルーティング設定になっている(開発環境なら毎回リクエスト時に実行される、本番環境ならビルド時だけ実行される。)。
//idがとりうる値のリストを返す
export async function getStaticPaths() {
  //ブログ投稿データのファイル名(id)を取得。
  const paths = getAllPostIds();

  return {
    paths, //どのパスが事前にレンダリングされるのか決める。
    fallback: false, //あとで説明。(falseにすると、上のpathsに含まれてないあらゆるパスはアクセスすると404ページになる。)
  };
}

//SSG(id(ファイル名)に基づいて必要なデータを取得)
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id); //あとでasyncとawaitをつける。

  console.log(postData);
  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHTML }} />
      </article>
    </Layout>
  );
}