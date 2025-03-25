export interface IsweetAlertProps {
  confirm: () => void;
  cancle: () => void;
  title: string;
  subtitle: string;
  type: "success" | "error" | "warning" | "info" | undefined;
  confirmBtnText: string;
  confirmBtnBsStyle: string;
}

export interface sweetAlertProps extends IsweetAlertProps {
  user: IsweetAlertProps;
}
