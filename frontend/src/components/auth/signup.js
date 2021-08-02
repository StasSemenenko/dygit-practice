import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Checkbox, message, PageHeader} from 'antd';
import http from '../../services/http';
import { FormItems } from '../../constants/signup';


export const AuthSignup = () => {
	const history = useHistory();

	const onFinish = async (values) => {
		console.log('Success:', values);
		try {
			const res = await http.post('/auth/signup', values);
			history.push('/auth/signin');
		}
		catch(e) {
			const msg = `${e.response.data.error}`;
            // : ${e.response.data.errors.join(', ')}
			message.error(msg);
		}
	};

    return (
        <>
    		<PageHeader
    	    	className="site-page-header" 
    	    	title="Registration"
    	    	// subTitle="This is a subtitle"
      		>
            </PageHeader>
            <Form className='Form_signup'
            name="basic"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 7 }}
    		
    		onFinish={onFinish}
            >
                {FormItems.map((item, index) => (
    				<Form.Item
    				key={index}
    				label={item.label}
    				name={item.name}
    				rules={ [{ required: true, message: item.errorMessage }] }>
    					<Input />
    				</Form.Item>
    			))}	

                <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                Submit
                    </Button>
                </Form.Item>
            </Form>
		</>
    );
};