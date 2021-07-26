import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, DeleteOutlined } from '@ant-design/icons';

const { Meta } = Card;

export const ProductView = () => {
	const {id} = useParams();
	useEffect(() => {

	},[]);

	return (
		<Card
		    style={{ width: 300 }}
		    cover={
		     	<img
			        alt="example"
			        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
	      		/>
    		}
		    actions={[
				<a href='/products'><button><EditOutlined/></button></a>,
				<a href='/products'><button><DeleteOutlined/></button></a>,
		    ]}
  		>
	  		<Meta
	    	//   avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
	     		title="Card title"
	    		description="This is the description"
	    	/>
			<>
				Produtc view : {id}
			</>
  		</Card>
	)
};
