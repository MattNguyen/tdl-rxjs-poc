import { Form as AntForm, Icon, Button, Row, Col } from 'antd';
import { withFormik, Field, Form } from "formik"

import { InputField } from "../../components/InputField"

import * as yup from "yup"

export const phoneNumberMatch = "must be a phone number";
export const loginSchema = yup.object().shape({
  phone: yup
    .string()
    .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, phoneNumberMatch)
    .required(),
});

const FormItem = AntForm.Item;

interface FormValues {
  phone: string;
}

interface NormalizedErrorMap {
  [key: string]: string;
}

interface Props {
  onFinish: () => void;
  submit: (values: FormValues) => Promise<NormalizedErrorMap | null>;
}

const AuthPhoneControl: React.FC<Props> = () => {
  return (
    <Row>
      <Col span={8} offset={8}>
        <Form style={{ display: "flex" }}>
          <div style={{ width: 400, margin: "auto" }}>
            <Field
              name="phone"
              prefix={
                <Icon type="phone" style={{ color: "rgba(0,0,0,.25)" }} /> as any
              }
              placeholder="Phone Number"
              component={InputField}
            />
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Sign In
              </Button>
            </FormItem>
          </div>
        </Form>
      </Col>
    </Row>
  )
}

export default withFormik<Props, FormValues>({
  validationSchema: loginSchema,
  validateOnChange: false,
  validateOnBlur: false,
  mapPropsToValues: () => ({ phone: "" }),
    handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    } else {
      props.onFinish();
    }
  }
})(AuthPhoneControl);
