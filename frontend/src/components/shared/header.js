import { Menu, Layout} from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

export const CustomHeader = ({isAuth, logOut}) => {
	return (
		<Header>
		<div className='logo' />
		<Menu theme='dark' mode='horizontal' >
		  <Menu.Item key='1'><Link to='/products'>Products</Link></Menu.Item>
		  <Menu.Item key='2'><Link to='/customers'>Customers</Link></Menu.Item>
		  <Menu.Item key='3'><Link to='/sellers'>Sellers</Link></Menu.Item>
		  <Menu.Item key='4'><Link to='/orders'>Orders</Link></Menu.Item>
		{isAuth ?
		  <Menu.Item key='5' onClick={ logOut }>Signout</Menu.Item>
		  :<>
		   <Menu.Item key='6'><Link to='/auth/signin'>Login</Link></Menu.Item>
		   <Menu.Item key='7'><Link to='/auth/signup'>Registration</Link></Menu.Item>
		 </>
	   }
	 </Menu>
	</Header>
	)
}