import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

import Layout from '../components/Layout';
import { pages } from '../data/pages';
import { isProd, Setting } from '../common/Setting';

const IndexPage = () => {

  let [Index, setIndex] = useState(0);
  let [Html, setHtml] = useState('');
  let [Menu, setMenu] = useState(false);

  useEffect(() => {
    PutHtml();
  }, [Index]);

  function SetPageOnUri(page: number) {
    history.pushState(null, '', `?page=${page}`);
  }

  async function PutHtml() {
    // Pageパラメタからページ番号を取得
    const uri = new URL(window.location.href);
    const page = uri.searchParams.get('page');
    let page_number = 0;
    // ページが有効であれば
    if (page && !isNaN(Number(page)) && Number(page) >= 0 && Number(page) < pages.length) {
      page_number = Number(page);
      setIndex(page_number);
    } else {
      SetPageOnUri(page_number); // TODO: URLパラメタが更新されない。
    }
    let title = pages[page_number].title;
    let prefix = isProd ? Setting.IMG_ROOT_PATH: '';
    try {
      await fetch(`${prefix}/textbook/${title}.html`)
      .then(response => response.text())
      .then(text => {
        if (isProd) {
          setHtml(text);
        } else {
          setHtml(text.replaceAll('/SC2022/textbook.img', '/textbook.img'));
        }
      });
      await fetch(`${prefix}/textbook.script/${title}.js`)
      .then(response => response.text())
      .then(text => eval(text));
    } catch (error) {}
  }

  return (
    <Layout title={`${pages[Index].title} (情報処理安全確保支援士試験対策)`} progress={Math.floor(Index / (pages.length - 1) * 100)}>
      <div id='Textbook'>
        <h1>{pages[Index].title}</h1>
        <div dangerouslySetInnerHTML={ { __html: Html } } />
      </div>
      <div>
        {Index > 0 && <Button id='ButtonPrev' variant="success" onClick={() => {setIndex(Index - 1); SetPageOnUri(Index - 1); window.scroll({ top: 0, behavior: 'smooth' });}}>前へ</Button>}
        {Index < pages.length - 1 && <Button id='ButtonNext' variant="primary" onClick={() => {setIndex(Index + 1); SetPageOnUri(Index + 1); window.scroll({ top: 0, behavior: 'smooth' })}}>次へ</Button>}
      </div>
      {Menu && <div id='Menu'>
        <ul>
          {pages.map((page, index) => {
            return (
              <li
                key={index}
                className={index === Index ? 'active' : ''}
                onClick={() => {setIndex(index); SetPageOnUri(index); window.scroll({ top: 0, behavior: 'smooth' });}}
              >
                {page.title}
              </li>
            )
          })}
        </ul>
        <Button id='ButtonCloser' variant="secondary" size='sm' onClick={() => setMenu(false)}>閉じる</Button>
      </div>}
      {!Menu && <Button id='ButtonMenu' variant="secondary" onClick={() => setMenu(true)}>メニュー</Button>}
    </Layout>
  );
}

export default IndexPage;
