import Block from '../../../block';
import template from './PCP.hbs';
import {withStore} from '../../../utils/store';
import {Button} from '../../../components/button/button';
import {Input} from "../../../components/input/input";
import ProfileController from "../../../controllers/ProfileController";
import {UpdatePasswordData} from "../../../API/UserApi";
import router from "../../../utils/router";
import {Routes} from "../../../utils/routes";

class ProfileChangePasswordBase extends Block {
  init() {

    this.children.oldPassword = new Input({
      name: 'oldPassword',
      type: 'password',
      placeholder: 'старый пароль'
    });
    this.children.newPassword = new Input({
      name: 'newPassword',
      type: 'password',
      placeholder: 'новый пароль'
    });


    this.children.saveButton = new Button({
      label: 'сохранить',
      events: {
        click: async () => {
          const data = Object.keys(this.children).reduce<UpdatePasswordData>((acc, key) => {
            const child = this.children[key]
            if (child instanceof Input) {
              acc[child.getName() as keyof UpdatePasswordData] = child.getValue();
            }
            return acc;
          }, {} as UpdatePasswordData);
          try {
            await ProfileController.changePassword(data);
            router.go(Routes.Profile);
          } catch (err) {
            console.log(err);
          }

        }
      }
    })

    this.children.cancelButton = new Button({
      label: 'отмена',
      events: {
        click: () => {
          router.go(Routes.Profile);

        }
      }
    })
  }


  render() {
    return this.compile(template, this.props);
  }
}

const withUser = withStore((state) => ({...state.user}))

export const ProfileChangePasswordPage = withUser(ProfileChangePasswordBase);


// function isEqual(a: Record<string, any>, b: Record<string, any>): boolean {
//   console.log(a, b);
//   if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) {
//     return false;
//   }
//   let bigObj = Object.keys(a).length > Object.keys(b).length ? a : b;
//   for (let prop in bigObj) {
//     if (!bigObj.hasOwnProperty(prop)) {
//       continue;
//     }
//     if (typeof a[prop] === 'object' && a[prop] !== null) {
//       let result = isEqual(a[prop], b[prop]);
//       if (result === false) {
//         return result;
//       }
//     }
//     if ((a || {})[prop] !== (b || {})[prop]) {
//       return false;
//     }
//   }
//   return true;
// }
// export default isEqual;
//
// const a = {a: 1};
// const b = {a: 1, b: 4};
// console.log(isEqual(a, b)); // true
