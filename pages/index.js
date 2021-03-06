export default {
    components :{
        addSwatchModal: () => import('@/components/add-swatch-modal/index.vue'),
        swatchLoader: () => import('@/components/color-swatch-loader/index.vue')
    },
    data () {
        return {
            colorPalettes: [],
            loading: true
        }
    },
    mounted () {
        this.fetchColorPalettes()
    },
    computed: {
        /**
         * cardColor
         * Method to change the
         * card color
        */
        cardColor () {
            if (this.$colorMode.preference === 'light') {
                return 'bg-white'
            } else {
                return 'bg-gray-900'
            }
        }
    },
    methods: {
        /**
         * fetchColorPalettes
         * Method to fetch the color
         * Palettes from the store 
        */
        async fetchColorPalettes () {
            this.loading = true
            await this.$store.dispatch('swatch/FETCH_COLOR')
            this.colorPalettes = this.$store.getters['swatch/getColorPalettes']
            this.loading = false
        },
        /**
         * openAddSwatchModal
         * Method to open the add
         * swatch modal
        */
        openAddSwatchModal () {
            let payload = {
                status: true
            }
            this.$nuxt.$emit('open-add-swatch-modal', payload)
        },
        /**
         * setActiveColor
         * @param {Number} index
         * @param {Number} swatch
         * Method to show the color-
         * code of the active color
        */
        setActiveColor (index, swatch) {
            let payload = {
                swatch: swatch,
                index: index
            }
            this.$store.dispatch("swatch/SET_ACTIVE_COLOR", payload)
        },
        /**
         * resetColor
         * @param {Number} index
         * Method to reset the active
         * states of the color
        */
        resetColor (index) {
            let payload = {
                index: index
            }
            this.$store.dispatch("swatch/RESET_ACTIVE_COLOR", payload)
        },
        /**
         * goTO
         * @param {Number} index
         * Method to route to the respective
         * swatch pages 
        */
        goTo (index) {
            let payload = {
                colorOne: this.colorPalettes[index].color_one,
                colorTwo: this.colorPalettes[index].color_two,
                colorThree: this.colorPalettes[index].color_three,
                colorFour: this.colorPalettes[index].color_four
            }
            this.$store.dispatch("swatch/SET_COLOR_SWATCH", payload)
            this.$router.push(`/color-swatch/${index + 1}`)
        }
    }
}
