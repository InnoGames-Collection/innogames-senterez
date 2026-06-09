export default {
  i18n: {
    en: {
      login: {
        title: 'Sign in',
        username: 'Username',
        password: 'Password',
        authenticate: 'Sign in',
        createaccount: 'Create account',
        errors: {
          user_not_found: 'User not found',
          passw_incorrect: 'Incorrect password',
          consultando: 'Signing in...'
        }
      },
      register: {
        title: 'Create account',
        username: 'Username',
        password: 'Password',
        name: 'Display name',
        email: 'Email',
        firstName: 'First name',
        lastName: 'Last name',
        insert: 'Create account',
        cancel: 'Cancel',
        mascul: 'Male',
        femen: 'Female',
        age: 'Age',
        passwordRepit: 'Confirm password',
        errors: {
          user_not_found: 'User not found',
          passw_incorrect: 'Incorrect password',
          consultando: 'Processing...'
        }
      },
      account: {
        personalData: {
          title: 'Profile',
          name: 'Name',
          username: 'Username',
          email: 'Email',
          created: 'Member since',
          edit: 'Edit profile'
        },
        activity: {
          title: 'Activity',
          vsPC: 'Stats vs computer',
          vsOtherUser: 'Stats vs players',
          wins: 'Wins',
          draws: 'Draws',
          losses: 'Losses',
          whites: 'White',
          blacks: 'Black'
        }
      },
      home: {
        title: 'Home',
        online: 'Online',
        played: 'In game',
        upload: 'Upload',
        invite: 'Invite',
        send: 'Send',
        inviteSend: 'Game invitation sent',
        createPart: {
          title: 'New game',
          time: 'Time (minutes)',
          type: 'Game type',
          create: 'Create',
          cancel: 'Cancel',
          black: 'Black',
          white: 'White',
          timePersonal: 'Custom time',
          fieldTime: 'Time',
          public: 'Public',
          private: 'Private'
        },
        uploadMens: {
          success: 'Files uploaded successfully',
          path_not_permit: 'File type not allowed',
          size_not_permit: 'File exceeds size limit'
        }
      },
      invites: {
        title: 'Invitations',
        numIn: 'Pending invitations',
        vspc: 'Play vs computer',
        initgame: 'Starting game...'
      },
      visor: {
        title: 'Game viewer',
        found: 'Results',
        whiteName: 'White player',
        blackName: 'Black player',
        result: 'Result',
        wins: 'Wins',
        by: 'by'
      },
      puzzles: {
        title: 'Puzzles',
        create: {
          title: 'Create puzzle',
          description: 'Add and share a chess puzzle',
          create: 'Create',
          delete: 'Delete',
          edit: 'Edit',
          cancel: 'Cancel',
          add: 'Adding puzzle...',
          fenInit: 'Starting position',
          fenFinish: 'Solution position'
        },
        list: 'Puzzle list',
        types: {
          MateIn1: {
            name: 'Mate in 1',
            descript: 'White wins in one move'
          },
          MateIn2: {
            name: 'Mate in 2',
            descript: 'White wins in two moves'
          },
          MateIn3: {
            name: 'Mate in 3',
            descript: 'White wins in three moves'
          },
          FindFork: {
            name: 'Find the fork',
            descript: 'Find the white move that creates a fork'
          },
          TakePiece: {
            name: 'Capture the piece',
            descript: 'A black piece is undefended — capture it'
          }
        },
        attention: 'Notice',
        attMen: 'Select a puzzle type to solve',
        createBy: 'Created by',
        date: 'Date',
        played: 'Play',
        movs: 'Moves remaining',
        wins: 'Correct',
        lost: 'Incorrect',
        reintent: 'Try again',
        intents: 'Attempts',
        color: {
          black: 'Black',
          white: 'White'
        }
      },
      about: {
        title: 'About',
        description: 'About Senterez',
        namegame: 'Senterez',
        seemore: 'Source code',
        des: 'Enterprise online chess platform. Play live multiplayer games, challenge the computer, solve puzzles, and review completed games.',
        tecn: 'Technology',
        dev: 'Developer',
        developer: 'InnoSphere Technologies — in partnership with Ethio Telecom',
        license: 'License',
        licenseText: 'Open source under GNU AGPL v3.0. See LICENSE and NOTICE in the repository.'
      },
      game: {
        title: 'Play',
        chat: 'Game chat',
        chatConver: 'Chat with',
        chatConverTooltip: 'Select an online player',
        rend: 'Resign',
        pieces: 'Pieces',
        board: 'Board',
        invert: 'Flip board',
        text: 'Message',
        descriptiontext: 'Send message',
        turnColor: 'Turn',
        wins: 'Wins',
        incheck: 'In check',
        motives: {
          time: 'on time',
          rendi: 'by resignation',
          login: 'Sign in'
        }
      },
      user: {
        title: 'Account',
        logout: 'Sign out',
        login: 'Sign in'
      }
    }
  }
}
