import DocumentHead from '../components/document-head'
import styles from '../styles/page.module.css'

const RenderPage = () => (
  <div className={styles.container}>
    <DocumentHead />

    <div>
      <h2>About</h2>
      <p>ツールや Tips が大好きな、自称ツールおじさんです。</p>
      <p>以下の話題について投稿していきます</p>

      <ul>
        <li>ツールの紹介</li>
        <li>こんなツールの使い方見つけた！</li>
        <li>ライフハック術</li>
        <li>コードハック術</li>
      </ul>
    </div>
  </div>
)

export default RenderPage
