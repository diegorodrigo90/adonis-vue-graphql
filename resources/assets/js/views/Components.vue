<script>
import Hero from './components/Hero'
import BasicElements from './components/BasicElements'
import Inputs from './components/Inputs'
import CustomControls from './components/CustomControls'
import Navigation from './components/Navigation'
import JavascriptComponents from './components/JavascriptComponents'
import Carousel from './components/Carousel'
import Icons from './components/Icons'
import Examples from './components/Examples'
import DownloadSection from './components/DownloadSection'

export default {
  name: 'Components',
  components: {
    Hero,
    BasicElements,
    Inputs,
    CustomControls,
    Navigation,
    JavascriptComponents,
    Carousel,
    Icons,
    Examples,
    DownloadSection
  }
}
</script>

<template>
  <div>
    <hero />
    <basic-elements />
    <inputs />
    <custom-controls />
    <navigation />
    <javascript-components />
    <icons />
    <examples />
    <download-section />
    <carousel />
  </div>
</template>
