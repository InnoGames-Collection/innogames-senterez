export default {
  i18n: {
    en: {
      common: {
        error: 'Error',
        notImplemented: 'Not available yet',
        confirmDelete: 'Delete this item?',
        confirmDeleteMessage: 'Delete this message?',
        editMessageSoon: 'Message editing is not available yet',
        next: 'Next',
        minutes: 'minutes',
        time: 'Time',
        color: 'Color',
        gender: 'Gender',
        edit: 'Edit',
        shareFile: 'Share file',
        inviteToGame: 'Invite to game',
        message: 'Message',
        owner: 'InnoSphere Technologies'
      },
      login: {
        title: 'Sign in',
        username: 'Username',
        password: 'Password',
        authenticate: 'Sign in',
        createaccount: 'Create account',
        errors: {
          user_not_found: 'User not found',
          passw_incorrect: 'Incorrect password',
          consultando: 'Signing in...',
          waking_server: 'Starting game server, please wait...',
          network_error: 'Cannot reach game server. Open the site again in one minute, then retry sign in.',
          service_unavailable: 'Game server is starting or database is unavailable. Try again shortly.',
          internal_server_error: 'Server error. Please try again.',
          email_required: 'Email is required',
          username_required: 'Username is required',
          error_unique_email: 'Email is already in use',
          error_unique_username: 'Username is already taken'
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
        ageError: 'Enter a valid age',
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
        settings: 'Settings',
        activity: {
          title: 'Activity',
          vsPC: 'Stats vs computer',
          vsOtherUser: 'Stats vs players',
          wins: 'Wins',
          draws: 'Draws',
          losses: 'Losses',
          whites: 'White',
          blacks: 'Black'
        },
        errors: {
          userNotFound: 'User not found',
          avatarUpdateFailed: 'Could not update profile image'
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
        inviteSelectPlayer: 'Open a chat with a player from the online list, then send the invite',
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
        initgame: 'Starting game...',
        humanVsPc: 'Human vs computer',
        waitingConfirm: 'Waiting for opponent confirmation...',
        deleted: 'Invitation removed',
        newInvite: 'You have a new game invitation',
        confirmed: 'Game invitation confirmed',
        confirmingStart: 'Confirming start...',
        errors: {
          user_played: 'You already have an active game',
          user_desconect: 'That player is offline',
          another_user_played: 'That player is already in a game',
          not_found: 'Game not found',
          not_authenticated: 'Please sign in again to play online'
        }
      },
      visor: {
        title: 'Game viewer',
        found: 'Results',
        whiteName: 'White player',
        blackName: 'Black player',
        result: 'Result',
        wins: 'Wins',
        by: 'by',
        winShort: 'W',
        motiveShort: 'M'
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
          fenFinish: 'Solution position',
          created: 'Puzzle created successfully',
          selectType: 'Select a puzzle type first',
          noMore: 'No more puzzles in this category',
          confirmDelete: 'Delete this puzzle?'
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
        played: 'Play as',
        movs: 'Moves remaining',
        wins: 'Correct',
        lost: 'Incorrect',
        reintent: 'Try again',
        intents: 'Attempts',
        countFailed: 'Could not load puzzle count',
        color: {
          black: 'Black',
          white: 'White'
        }
      },
      about: {
        title: 'About',
        description: 'About Senterez',
        namegame: 'Senterez ሰንጠረዥ',
        seemore: 'Source code',
        des: 'Enterprise online chess platform by InnoSphere Technologies. Play live multiplayer games, challenge the computer, solve puzzles, and review completed games.',
        tecn: 'Technology',
        dev: 'Developer',
        developer: 'InnoSphere Technologies',
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
        wins: 'wins',
        incheck: 'In check',
        draw: 'Draw',
        colors: {
          white: 'White',
          black: 'Black',
          draw: 'Draw'
        },
        motives: {
          timeout: 'on time',
          rendicion: 'by resignation',
          resignation: 'by resignation',
          checkmate: 'by checkmate',
          stalemate: 'by stalemate',
          drawn_position: 'drawn position',
          threefold_repetition: 'by threefold repetition',
          insufficient_material: 'by insufficient material',
          draw: 'draw'
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
