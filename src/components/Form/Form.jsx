import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useValidation, validateDate } from '@mui/x-date-pickers/validation';
import { 
  useSplitFieldProps, 
  useParsedFormat, 
  usePickerContext,
} from '@mui/x-date-pickers/hooks';
import Button from '@mui/material/Button';
import useForkRef from '@mui/utils/useForkRef';
import dayjs from "dayjs";
import css from "./Form.module.css";
import 'dayjs/locale/en-gb';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

dayjs.locale('en-gb');

function ButtonDateField(props) {
  const { internalProps, forwardedProps } = useSplitFieldProps(props, 'date');
  const pickerContext = usePickerContext();
  const handleRef = useForkRef(pickerContext.triggerRef, pickerContext.rootRef);
  const parsedFormat = useParsedFormat();
  
  const { hasValidationError } = useValidation({
    validator: validateDate,
    value: pickerContext.value,
    timezone: pickerContext.timezone,
    props: internalProps,
  });

  const valueStr = pickerContext.value == null 
    ? parsedFormat 
    : pickerContext.value.format(pickerContext.fieldFormat);

  const textColor = pickerContext.value == null ? 'var(--gray)' : 'var(--black)';

  return (
    <Button
      {...forwardedProps}
      variant="outlined"
      color={hasValidationError ? 'error' : 'primary'}
      ref={handleRef}
      className={pickerContext.rootClassName}
      sx={{
        ...pickerContext.rootSx,
        backgroundColor: 'var(--dark-white)',
        borderRadius: '12px',
        fontFamily: 'Manrope, sans-serif',
        fontWeight: 500,
        fontSize: '16px',
        lineHeight: '20px',
        color: textColor, 
        width: '576px',
        height: '48px',
        padding: '0 20px',
        border: 'none',
        justifyContent: 'flex-start',
        textTransform: 'none',
      }}  
      onClick={() => pickerContext.setOpen((prev) => !prev)}
    >
      {pickerContext.label ? `${pickerContext.label}: ${valueStr}` : valueStr}
    </Button>
  );
}

function ButtonFieldDatePicker(props) {
  return (
    <DatePicker
      {...props}
      slots={{
        ...props.slots,
        field: ButtonDateField
      }}
      slotProps={{
        ...props.slotProps,
        popper: {
          sx: {
            '& .MuiPaper-root': {
              borderRadius: '12px',
              border: '1px solid var(--blue)',
              backgroundColor: 'var(--white)',
              color: 'var(--black)',
              '& .MuiPickersDay-root': {
                fontFamily: 'Inter',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '120%',
              },
              '& .MuiPickersDay-root.Mui-selected': {
                backgroundColor: 'var(--blue)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'var(--blue)',
                }
              },
              '& .MuiPickersCalendarHeader-root': {
                minHeight: '30px',
                marginBottom: '3px',
              },
              '& .MuiDayCalendar-header': {
                borderBottom: '1px solid var(--blue)',
                paddingBottom: '6px',
                marginBottom: '6px',
              },
              '& .MuiDayCalendar-weekDayLabel': {
                fontFamily: 'Inter',
                fontWeight: 600,
                fontSize: '12px',
                lineHeight: '120%',
                textAlign: 'center',
                color: 'var(--gray)',
              },
              '& .MuiPickersCalendarHeader-label': {
                fontFamily: 'Inter',
                fontWeight: 600,
                fontSize: '16px',
                lineHeight: '120%',
                textAlign: 'center',
                margin: '0 auto',
              },
              '& .MuiPickersCalendarHeader-switchViewButton': {
                display: 'none',
              },
              '& .MuiPickersArrowSwitcher-button': {
                width: '24px',
                height: '24px',
                color: 'var(--dark-blue)',
              }
            }
          }
        }
      }}
      dayOfWeekFormatter={(day) => day.format('ddd').toUpperCase()}
    />
  );
}

export default function CarForm({ onSubmit }) {
  
  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .min(3, "Minimum 3 characters")
      .max(60, "Maximum 60 characters")
      .required("Required field"),
    email: Yup.string().email("Incorrect email").required("Required field"),
    date: Yup.date().nullable().required("Required field"),
    message: Yup.string().max(2000, "Maximum 2000 characters"),
  });

  return (
    <div className={css.rForm}>
      <h2 className={css.titel}>Book your car now</h2>
      <p className={css.text}>Stay connected! We are always ready to help you.</p>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
        <Formik
          initialValues={{
            name: "",
            email: "",
            date: null,
            message: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            if (onSubmit) onSubmit(values);
            else console.log("Submitted:", values);
            iziToast.success({
              title: "Success",
              message: "The car has been successfully rented!",
              position: "topRight",
            });
            setSubmitting(false);
            resetForm();
          }}
        >
          {({ setFieldValue, values, errors, touched }) => (
            <Form className={css.form}>
              <div className={css.fieldWrapper}>
                <Field
                  name="name"
                  type="text"
                  className={css.input}
                  placeholder="Name*"
                />
                <ErrorMessage name="name" component="div" className={css.error} />
              </div>

              <div className={css.fieldWrapper}>
                <Field
                  name="email"
                  type="email"
                  className={css.input}
                  placeholder="Email*"
                />
                <ErrorMessage name="email" component="div" className={css.error} />
              </div>

              <div className={css.fieldWrapper}>
                <ButtonFieldDatePicker
                  label="Booking date"
                  showDaysOutsideCurrentMonth
                  value={values.date ? dayjs(values.date) : null}
                  onChange={(newValue) =>
                    setFieldValue("date", newValue ? newValue.toDate() : null)
                  }
                  slotProps={{
                    textField: {
                      error: touched.date && !!errors.date,
                    },
                    popper: {
                      sx: {
                        '& .MuiPaper-root': {
                          borderRadius: '12px',
                        }
                      }
                    }
                  }}
                />
                <ErrorMessage name="date" component="div" className={css.error} />
              </div>

              <div className={css.fieldWrapper}>
                <Field
                  name="message"
                  as="textarea"
                  rows={4}
                  className={css.textarea}
                  placeholder="Comment"
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className={css.error}
                />
              </div>

              <button type="submit" className={css.btn}>
                Send
              </button>
            </Form>
          )}
        </Formik>
      </LocalizationProvider>
    </div>
  );
}
