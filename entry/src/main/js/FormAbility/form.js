import formBindingData from '@ohos.app.form.formBindingData';
import formInfo from '@ohos.app.form.formInfo';
import formProvider from '@ohos.app.form.formProvider';
import dataStorage from '@ohos.data.storage';

export default {
    onCreate(want) {
        console.info('FormAbility onCreate');
        let obj = {
            "title": "titleOnCreate",
            "detail": "detailOnCreate"
        };
        let formData = formBindingData.createFormBindingData(obj);
        return formData;
    },

    onCastToNormal(formId) {
        console.info('FormAbility onCastToNormal');
    },

    onUpdate(formId) {
        console.info('FormAbility onUpdate');
        let obj = {
            "title": "titleOnUpdate",
            "detail": "detailOnUpdate"
        };
        let formData = formBindingData.createFormBindingData(obj);
        formProvider.updateForm(formId, formData).catch((error) => {
            console.info('FormAbility updateForm, error:' + JSON.stringify(error));
        });
    },

    onVisibilityChange(newStatus) {
        console.info('FormAbility onVisibilityChange');
    },

    onEvent(formId, message) {
        console.info('FormAbility onEvent');
    },

    onDestroy(formId) {
        console.info('FormAbility onDestroy');
    },

    onAcquireFormState(want) {
        console.info('FormAbility onAcquireFormState');
        return formInfo.FormState.READY;
    }
};
