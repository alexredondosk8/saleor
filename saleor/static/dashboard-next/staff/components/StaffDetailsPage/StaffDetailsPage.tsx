import * as React from "react";

import CardSpacer from "../../../components/CardSpacer";
import { ConfirmButtonTransitionState } from "../../../components/ConfirmButton/ConfirmButton";
import Container from "../../../components/Container";
import Form from "../../../components/Form";
import Grid from "../../../components/Grid";
import PageHeader from "../../../components/PageHeader";
import SaveButtonBar from "../../../components/SaveButtonBar";
import { getUserName, maybe } from "../../../misc";
import { PermissionEnum } from "../../../types/globalTypes";
import {
  StaffMemberDetails_shop_permissions,
  StaffMemberDetails_user
} from "../../types/StaffMemberDetails";
import StaffPermissions from "../StaffPermissions/StaffPermissions";
import StaffProperties from "../StaffProperties/StaffProperties";
import StaffStatus from "../StaffStatus/StaffStatus";

interface FormData {
  hasFullAccess: boolean;
  isActive: boolean;
  permissions: PermissionEnum[];
  firstName: string;
  lastName: string;
  email: string;
}

export interface StaffDetailsPageProps {
  disabled: boolean;
  permissions: StaffMemberDetails_shop_permissions[];
  saveButtonBarState: ConfirmButtonTransitionState;
  staffMember: StaffMemberDetails_user;
  onBack: () => void;
  onDelete: () => void;
  onSubmit: (data: FormData) => void;
}

const StaffDetailsPage: React.StatelessComponent<StaffDetailsPageProps> = ({
  disabled,
  permissions,
  saveButtonBarState,
  staffMember,
  onBack,
  onDelete,
  onSubmit
}: StaffDetailsPageProps) => {
  const initialForm: FormData = {
    email: maybe(() => staffMember.email),
    firstName: maybe(() => staffMember.firstName),
    hasFullAccess: maybe(
      () =>
        permissions.filter(
          perm =>
            maybe(() => staffMember.permissions, []).filter(
              userPerm => userPerm.code === perm.code
            ).length === 0
        ).length === 0,
      false
    ),
    isActive: maybe(() => staffMember.isActive, false),
    lastName: maybe(() => staffMember.lastName),
    permissions: maybe(() => staffMember.permissions, []).map(perm => perm.code)
  };
  return (
    <Form initial={initialForm} onSubmit={onSubmit} confirmLeave>
      {({ data, change, hasChanged, submit }) => (
        <Container width="md">
          <PageHeader title={getUserName(staffMember)} onBack={onBack} />
          <Grid>
            <div>
              <StaffProperties
                data={data}
                disabled={disabled}
                staffMember={staffMember}
                onChange={change}
              />
            </div>
            <div>
              <StaffPermissions
                data={data}
                disabled={disabled}
                permissions={permissions}
                onChange={change}
              />
              <CardSpacer />
              <StaffStatus data={data} disabled={disabled} onChange={change} />
            </div>
          </Grid>
          <SaveButtonBar
            disabled={disabled || !hasChanged}
            state={saveButtonBarState}
            onCancel={onBack}
            onSave={submit}
            onDelete={onDelete}
          />
        </Container>
      )}
    </Form>
  );
};
StaffDetailsPage.displayName = "StaffDetailsPage";
export default StaffDetailsPage;
