import { PageHeader } from 'antd';

export const HomePage = () => {
  return (
    <>
      <PageHeader
        className="site-page-header"
        title='Главная станица'
        onBack={() => window.history.back()}
      />
      <div className='ant-page-header home'>
        <h1>Добро пожаловать</h1>
        <p style={{ fontSize: 15 }}>Выберите интересующие Вас пункты</p>
      </div>
    </>
  )
};
