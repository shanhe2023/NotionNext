// 导入所需的库和模块
import Document, { Html, Head, Main, NextScript } from 'next/document'
import BLOG from '@/blog.config'
import CommonScript from '@/components/CommonScript'

// 创建一个继承自Document的类
class MyDocument extends Document {
  // 用于服务器渲染的初始属性
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  // 渲染方法，用于生成HTML结构
  render() {
    return (
      <Html lang={BLOG.LANG}>
        <Head>
          <link rel='icon' href= {`${BLOG.BLOG_FAVICON}`} />
          <CommonScript />
          {/* 预加载字体 */}
          {BLOG.FONT_AWESOME && <>
            <link rel='preload' href={BLOG.FONT_AWESOME} as="style" crossOrigin="anonymous" />
            <link rel="stylesheet" href={BLOG.FONT_AWESOME} crossOrigin="anonymous" referrerPolicy="no-referrer" />
          </>}

          {BLOG.FONT_URL?.map((fontUrl, index) => {
            if (fontUrl.endsWith('.css')) {
              return <link key={index} rel="stylesheet" href={fontUrl} />
            } else {
              return <link key={index} rel="preload" href={fontUrl} as="font" type="font/woff2" />
            }
          })}
        </Head>
        {/* 在body标签中添加oncopy属性，禁止复制 */}
        <body className={`${BLOG.FONT_STYLE} font-light scroll-smooth`} oncopy="return false;">
          <Main />
          <NextScript />
          {/* 在script标签中添加事件监听，当用户试图复制时，阻止复制并弹出警告消息 */}
          <script>
            document.oncopy = function(event) {
              event.preventDefault();
              window.alert('抱歉，这个内容暂时不能复制');
              return false;
            };
          </script>
        </body>
      </Html>
    )
  }
}

// 导出MyDocument类，以便其他文件可以引用
export default MyDocument
